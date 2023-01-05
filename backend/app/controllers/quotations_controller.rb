class QuotationsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :entity_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response

    def index 
        quotations = Quotation.all
        render json: quotations, status: :ok
    end
    def  show 
        quotation = Quotation.find(params[:id])
        render json: quotation ,  status: :ok
    end

    def create

        quotation = Quotation.create!(quotation_params.merge(service_provider_id: current_user.id))
        render json: quotation, status: :accepted
    end

    def update
        quotation = Quotation.find(params[:id])
        quotation.update(quotation_params)
        render json: quotation, status: :accepted
    end

    def destroy
        quotation= Quotation.find(params[:id])
        quotation.destroy
        head :no_content
    end

    def confirm_quote
        quotation= Quotation.find(params[:id])
        service = Service.find(quotation.service_id)
        confirmed_quotation = service.quotations.where(confirmed: true)
        if confirmed_quotation.length>0
            render json: { "error": "Service already has confirmed quote" }, status: :unprocessable_entity
        else
            quotation.update!(confirmed: true)
            HomeSpaceMailer.with(user: current_user).service_request_confirmation.deliver_now
            render json: quotation
        end
       
    end

    def show_confirmation
        bookings = Quotation.where(service_provider_id: current_user.id , confirmed: true)
        render json: bookings ,each_serializer: QuotationWithUsersSerializer ,  status: :ok
    end
    

    # def show_user_details
    #    booked = Quotation.where(service_provider_id: current_user.id , confirmed: true)
    #     service = Service.find(booked.service_id)
    #     user = User.find(service.user_id)
    #     render json: user, status: :ok
    
    # end


    private

    def quotation_params
        params.permit(:quotation, :comment, :date, :service_id)
    end

    def entity_not_found_response
        render json: { "error": "Quotation not found." }, status: :not_found
    end

    def unprocessable_entity_response exception
        render json: { "errors": exception.record.errors.full_messages },status: :unprocessable_entity
    end


end
