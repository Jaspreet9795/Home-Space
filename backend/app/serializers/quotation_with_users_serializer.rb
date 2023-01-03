class QuotationWithUsersSerializer < ActiveModel::Serializer
    attributes :id, :quotation, :comment, :date, :service_id, :service_provider_id, :confirmed
    has_one :service
    attributes :user_info
    def user_info
        User.find(object.service.user_id)
    end
  end