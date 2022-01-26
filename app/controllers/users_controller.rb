class UsersController < ApplicationController

    before_action :authenticate_user, only: [:update]
    before_action :check_user, only: [:show]
    # def index 
    #     users = User.all
    #     render json: users
    # end

    def profile
        user = User.find(session[:user_id])
        render json: user, include: ['trips', 'trips.host','trips.users', 'trips.participants'],  serializer: UserSelfSerializer
    end

    def test
        byebug
    end

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, serializer: WhoamiSerializer, status: :created
        else
            render json: {errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def update
        user = User.find(session[:user_id])
        user.update(user_params)
        render json: user, status: :created, include: ['trips', 'trips.host','trips.users'], serializer: UserSelfSerializer
    end


    private

    def user_params
        params.permit(:id, :age, :email, :gender, :name, :password, :password_confirmation, :bio, :activity, :city, :profile_pic)
    end

    def authenticate_user
        return render json: { error: "Not authorized" }, status: :unauthorized unless session[:user_id] == User.find(params[:id]).id
    end

    def check_user
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
