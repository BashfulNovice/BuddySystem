class Trip < ApplicationRecord
    #associations
    belongs_to :host, class_name: "User", foreign_key: "host_user"
    has_many :participants, dependent: :destroy
    has_many :users, through: :participants
    has_many :messages

    #validations

    validates :host_user, presence: true
    validates :title, presence: true
    validates :start, presence: true
    validates :longitude, presence: true
    validates :latitude, presence: true
    

end
