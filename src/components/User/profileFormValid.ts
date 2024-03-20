type ErrorObj = {
 handle?: string;
 bio?: string;
 location?: string;
 website?: string;
 banner?: string;
 image?: string;
};

export function isProfileFormValid(form: any) {
 let errors: ErrorObj = {};
 const handle = form.watch("handle");
 const bio = form.watch("bio");
 const location = form.watch("location");
 const website = form.watch("website");
 const banner = form.watch("banner");
 const image = form.watch("image");
 if (handle) {
  if (handle.length < 1) {
   errors.handle = "Handle must be at least 1 character";
  }
  if (handle.length > 20) {
   errors.handle = "Handle must be less than 20 characters";
  }
  if (!/^[^<>[\]{}\\|`~]+$/.test(handle)) {
   errors.handle = "Handle must not contain certain special characters";
  }
 }
 if (bio && bio.length > 160) {
  errors.bio = "Bio must be at most 160 characters";
 }
 if (location && location.length > 40) {
  errors.location = "Location must be at most 40 characters";
 }
 if (website && !/^(http|https):\/\/[^ "]+$/.test(website)) {
  errors.website = "Invalid URL";
 }
 if (Object.keys(errors).length > 0) {
  return { errors };
 }
 return !handle;
}
