class AddCompletionToServices < ActiveRecord::Migration[7.0]
  def change
    add_column :services, :completion, :boolean , default: false
  end
end
