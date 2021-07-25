class Climb < ApplicationRecord

    has_many :sends

    validates :grade, presence: true
    validates :color, presence: true
    validates :location, presence: true

    


end
