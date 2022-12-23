class ServiceWithQuotationsSerializer < ActiveModel::Serializer
    attributes :id, :service_type, :description, :images, :dates
    has_many :quotations
  end