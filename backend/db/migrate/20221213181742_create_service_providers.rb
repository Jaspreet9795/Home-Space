class CreateServiceProviders < ActiveRecord::Migration[7.0]
  def change
    create_table :service_providers do |t|
      t.string  :name
      t.string  :service_type
      t.integer :experience
      t.string  :address
      t.integer :phone 
      t.string  :email
      t.string  :password 
    
      t.timestamps
    end
  end
end
