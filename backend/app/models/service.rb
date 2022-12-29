class Service < ApplicationRecord
    
    belongs_to :user
    belongs_to :service_provider , optional: true 
    
    has_many :quotations
  

end
