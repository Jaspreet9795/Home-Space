class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string  :name 
      t.string :role 
      t.string :service_provided
      t.string  :address
      t.integer :zip
      t.string :state
      t.string  :email
      t.string  :password_digest
      t.string :phone 
      t.timestamps
    end
  end
end
