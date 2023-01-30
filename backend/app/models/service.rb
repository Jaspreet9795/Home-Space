class Service < ApplicationRecord
    
    belongs_to :user
    belongs_to :service_provider , optional: true 
    
    has_many :quotations, dependent: :destroy
    has_many :users, through: :quotations
  

end
