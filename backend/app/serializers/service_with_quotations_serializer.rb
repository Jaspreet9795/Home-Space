class ServiceWithQuotationsSerializer < ActiveModel::Serializer
    attributes :id, :service_type, :description, :images, :dates, :user_id
    has_many :quotations , include: :service_provider

    has_one :service_provider, through: :quotations
    # attributes :service_provider_info


    def service_provider
      User.find(object.quotations.map {|quote| quote.service_provider_id})
    end 


  end