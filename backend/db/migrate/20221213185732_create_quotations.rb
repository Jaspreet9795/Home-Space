class CreateQuotations < ActiveRecord::Migration[7.0]
  def change
    create_table :quotations do |t|
      t.float  :quotation
      t.string :comment 
      t.date   :date
      t.belongs_to :service_provider
      t.belongs_to :service 
      
      t.timestamps
    end
  end
end
