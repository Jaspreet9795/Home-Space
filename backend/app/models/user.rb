class User < ApplicationRecord
    has_secure_password

    # has_many :services
    has_many :quotations, through: :services

     validates :email, uniqueness: true
     validates:password, length: {minimum: 3}
     validates :phone , length: {is: 10}

end
