class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :service_type, :description, :images, :dates, :user_id, :completion
end
