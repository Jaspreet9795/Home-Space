class ServiceWithQuotationsSerializer < ActiveModel::Serializer
    attributes :id, :service_type, :description, :images, :dates
    has_many :quotations
    # each_serializer: QuotationSerializer
    # def quotations
    #   object.quotations.map do |quotation|
    #     QuotationSerializer.new(quotation).attributes
    #   end
    # end
  end