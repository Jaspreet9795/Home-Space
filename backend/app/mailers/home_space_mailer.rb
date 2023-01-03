class HomeSpaceMailer < ApplicationMailer
    default from: 'notifications@homeSpace.com'

    def service_request_confirmation
        @user = params[:user]
      
        mail(to: @user.email, subject: ' Service request confirmation')
      end
end
