class Message < ApplicationRecord

  #associations
  belongs_to :sender, class_name: "User", foreign_key: "sender_id"
  belongs_to :trip

  #validation
  validates :content, presence: true
  validates :sender_id, presence: true
  validates :trip_id, presence: true

end
