type ProfileDetailKey =
    | 'personal_info_age'
    | 'personal_info_gender'
    | 'personal_info_job'
    | 'personal_info_personality'
    | 'personal_info_living_arrangement'
    | 'personal_info_family_relationship'
    | 'personal_info_interpersonal_relationship'
    | 'like_people'
    | 'like_celebrities'
    | 'like_colors'
    | 'like_places'
    | 'like_foods'
    | 'like_activities'
    | 'like_hobbies'
    | 'dislike_foods'
    | 'dislike_people'
    | 'dislike_behaviors'
    | 'dislike_celebrities'
    | 'recent_updates_interest'
    | 'recent_updates_concern'
    | 'recent_updates_daily_life'
    | 'recent_updates_relationship_update'
    | 'recent_updates_future_plans'
    | 'recent_updates_anxieties'
    | 'recent_updates_goals'
    | 'activities_past_activity'
    | 'activities_current_activity'
    | 'activities_future_activity';

export type MemoryType = {
  id: string;
  userId: string;
  type: ProfileDetailKey;
  description: string;
}