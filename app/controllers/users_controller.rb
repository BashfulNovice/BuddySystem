class UsersController < ApplicationController

    def index 
        users = User.all
        render json: users
    end

    def profile
        user = User.find(session[:user_id])
        render json: user, include: ['trips', 'trips.host','trips.users'],  serializer: UserSelfSerializer
    end

    def test
        byebug
    end

    def create
        user = User.create(user_params)
        render json: user
    end

    def show
        user = User.find(params[:id])
        render json: user, serializer: UserSelfSerializer
    end

    def update
        user = User.find(session[:user_id])
        user.update(user_params)
        render json: user, status: :created, include: ['trips', 'trips.host','trips.users'], serializer: UserSelfSerializer
    end


    private

    def user_params
        params.permit(:id, :age, :email, :gender, :name, :password, :password_confirmation, :bio, :activity, :city)
    end

end
