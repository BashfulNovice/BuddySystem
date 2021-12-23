class TripsController < ApplicationController

    def index
        trips = Trip.all
        render json: trips
    end

    def create
        trip = Trip.create(tripParams)
        participant = Participant.create(user_id: trip.host.id, trip_id: trip.id)
        trip.update(current_participants: trip.participants.length)
        render json: trip
    end

    def destroy
        trip = Trip.find(params[:id])
        trip.destroy
        head :no_content
    end

    private

    def tripParams
        params.permit(:title, :description, :longitude, :latitude, :start, :requirements, :max_participants, :minimum_participants, :current_participants, :host_user)
    end

end
