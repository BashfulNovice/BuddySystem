class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.text :content
      t.integer :sender_id
      t.belongs_to :trip, null: false, foreign_key: true

      t.timestamps
    end
  end
end
