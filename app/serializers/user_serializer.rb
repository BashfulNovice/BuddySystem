class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :gender, :profile_pic, :city, :activity, :bio

  has_many :trips
end
