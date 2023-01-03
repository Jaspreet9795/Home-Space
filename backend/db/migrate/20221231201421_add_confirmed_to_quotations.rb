class AddConfirmedToQuotations < ActiveRecord::Migration[7.0]
  def change
    add_column :quotations, :confirmed, :boolean 
  end
end
