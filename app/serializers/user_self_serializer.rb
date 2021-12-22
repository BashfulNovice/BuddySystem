class UserSelfSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :gender, :city, :activity, :bio, :profile_pic, :email

  has_many :trips, serializer: TripSerializer
end
