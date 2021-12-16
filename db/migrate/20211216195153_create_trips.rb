class CreateTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :trips do |t|
      t.string :title
      t.text :description
      t.date :start
      t.date :end
      t.float :longitude
      t.float :latitude
      t.integer :minimum_participants
      t.integer :current_participants
      t.integer :max_participants
      t.integer :host_user
      t.text :requirements

      t.timestamps
    end
  end
end
