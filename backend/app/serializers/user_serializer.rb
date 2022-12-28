class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :role, :service_provided, :address, :zip, :state, :email, :phone
end
