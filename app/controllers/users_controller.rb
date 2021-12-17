class UsersController < ApplicationController

    def index 
        users = User.all
        render json: users
    end

    def test
        byebug
    end

    def create
        byebug
        user = User.create(user_params)
        render json: user
    end

    def show
        user = User.find(params[:id])
        render json: user, serializer: UserSelfSerializer
    end

    private

    def user_params
        params.permit(:id, :age, :email, :gender, :name, :password, :password_confirmation)
    end

end
