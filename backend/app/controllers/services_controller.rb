class ServicesController < ApplicationController
    include ::ActionController::Serialization
    rescue_from ActiveRecord::RecordNotFound, with: :entity_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response

    def index 
        services = Service.all
        render json: services , status: :ok
    end
   

    def  show 
        service = Service.find(params[:id])
        puts('show service ', service.inspect)
        render json: service, serializer: ServiceSerializer , status: :ok
    end

    def filter_service
        user = current_user
        service = Service.where(service_type: current_user.service_provided)
        render json: service , each_serializer: ServiceSerializer
    end 

    # show services created by  clients along with quotations and service provider's name
    def filter_user_service
       user= current_user
       service = Service.where(user_id: current_user.id)
       render json: service, each_serializer: ServiceWithQuotationsSerializer,  status: :ok
    end 

   
   # when service request is created User_id is added based on logged in user id
    def create
        puts(service_params)
        service = Service.create!(service_params.merge(user_id: current_user.id) )
        render json: service, status: :accepted
    end

    def update
        service = Service.find(params[:id])
        service.update(service_params)
        render json: service, status: :accepted
    end

    def destroy
        service = Service.find(params[:id])
        service.destroy
        head :no_content
    end


    private

    def service_params
        params.permit(:service_type, :description, :images, {:dates=>[]}, :completion)
    end

    def entity_not_found_response
        render json: { "error": "Service not found." }, status: :not_found
    end

    def unprocessable_entity_response exception
        render json: { "errors": exception.record.errors.full_messages },status: :unprocessable_entity
    end
end

