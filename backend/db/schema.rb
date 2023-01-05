# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_05_071826) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "quotations", force: :cascade do |t|
    t.float "quotation"
    t.string "comment"
    t.date "date"
    t.bigint "service_provider_id"
    t.bigint "service_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "confirmed"
    t.index ["service_id"], name: "index_quotations_on_service_id"
    t.index ["service_provider_id"], name: "index_quotations_on_service_provider_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "service_provider_id"
    t.integer "rating"
    t.string "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["service_provider_id"], name: "index_reviews_on_service_provider_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "service_providers", force: :cascade do |t|
    t.string "name"
    t.string "service_type"
    t.integer "experience"
    t.string "address"
    t.integer "phone"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "services", force: :cascade do |t|
    t.string "service_type"
    t.string "description"
    t.binary "images"
    t.date "dates", default: [], array: true
    t.bigint "user_id"
    t.bigint "service_provider_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "completion", default: false
    t.index ["service_provider_id"], name: "index_services_on_service_provider_id"
    t.index ["user_id"], name: "index_services_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "role"
    t.string "service_provided"
    t.string "address"
    t.integer "zip"
    t.string "state"
    t.string "email"
    t.string "password_digest"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
