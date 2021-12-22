class TripSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :requirements, :latitude, :longitude, :host_user, :max_participants, :minimum_participants, :current_participants, :start

  belongs_to :host
  has_many :users
end
