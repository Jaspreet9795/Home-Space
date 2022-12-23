class Service < ApplicationRecord
    belongs_to :user
    belongs_to :service_provider
    
    has_many :quotations
  

end
