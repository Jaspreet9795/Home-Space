class QuotationSerializer < ActiveModel::Serializer
  attributes :id, :quotation, :comment, :date, :service_id, :service_provider_id
  # has_one :user
  # attributes :user_info



  # def user_info
  #   User.find(object.service_provider_id)
  # end 



end
