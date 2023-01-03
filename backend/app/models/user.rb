class User < ApplicationRecord
    has_secure_password

    has_many :services
    has_many :quotations, through: :services



end
