class ChangeImagesToBeBinaryInServices < ActiveRecord::Migration[7.0]
  def change
    change_column :services, :images, :binary, using: 'images::bytea'
  end
end
