class AddDetailsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :age, :integer
    add_column :users, :gender, :string
    add_column :users, :profile_pic, :string
    add_column :users, :bio, :text
  end
end
