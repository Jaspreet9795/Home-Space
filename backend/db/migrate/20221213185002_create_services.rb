class CreateServices < ActiveRecord::Migration[7.0]
  def change
    create_table :services do |t|
      t.string :service_type
      t.string :description
      t.string :images
      t.date   :dates,  array: true, default: []
      t.belongs_to :user
      t.belongs_to :service_provider
      t.timestamps
    end
  end
end
