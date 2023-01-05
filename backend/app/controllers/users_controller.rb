class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :entity_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
     
    skip_before_action :authorised_user, only: [:create]
    def index 
        users = User.all
        render json: users, status: :ok
    end
    def  show 
        user = User.find(session[:user_id])
        render json: user,   status: :ok
    end

    def users
        user= User.where(role: "User")
        render json: user, status: :ok
    end 

    def users_service_providers
        user= User.where(role: "Service Provider")
        # user = User.all
        render json: user, status: :ok
    end 

    def electricians
        electrician = User.where(service_provided: "Electrician")
        render json: electrician, status: :ok
    end 
    def plumbers
        plumber = User.where(service_provided: "Plumber")
        render json: plumber, status: :ok
    end 
    def landscaping
        landscaping = User.where(service_provided: "Landscaping")
        render json: landscaping, status: :ok
    end 
    def home_cleaning
        home_cleaning = User.where(service_provided: "Home Cleaning")
        render json: home_cleaning, status: :ok
    end 
    def home_painting
        home_painting = User.where(service_provided: "Home Painting")
        render json: home_painting, status: :ok
    end 

    def create
        user = User.create!(user_params)
        render json: user, status: :accepted
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        render json: user, status: :accepted
    end

    def destroy
        user= User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:name, :role, :service_provided, :address, :zip, :state, :email, :password, :phone)
    end

    def entity_not_found_response
        render json: { "error": "User not found." }, status: :not_found
    end

    def unprocessable_entity_response exception
        render json: { "errors": exception.record.errors.full_messages },status: :unprocessable_entity
    end

end
