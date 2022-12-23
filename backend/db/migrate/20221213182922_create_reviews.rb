class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.belongs_to :user
      t.belongs_to :service_provider
      t.integer :rating
      t.string :comment
      t.timestamps
    end
  end
end
