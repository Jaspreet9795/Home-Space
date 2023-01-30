class QuotationWithUsersSerializer < ActiveModel::Serializer
    attributes :id, :quotation, :comment, :date, :service_id, :service_provider_id, :confirmed
    has_one :service
    attributes :user_info
    def user_info
        puts ("This is user_id #{object.service}")
        if (object.service !=nil)
        User.find(object.service.user_id)
        end
    end


  end