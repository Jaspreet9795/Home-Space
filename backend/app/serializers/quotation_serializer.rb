class QuotationSerializer < ActiveModel::Serializer
  attributes :id, :quotation, :comment, :date, :service_id, :service_provider_id, :confirmed
  # has_one :user


end
