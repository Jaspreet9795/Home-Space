class Quotation < ApplicationRecord
    has_one :service_provider
    has_one :service
end
