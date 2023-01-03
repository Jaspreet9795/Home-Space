class Quotation < ApplicationRecord
    # has_one :service_provider
    # has_one :service
    # has_one :user, through: :service

    belongs_to :service
    belongs_to  :user, optional: true
end
