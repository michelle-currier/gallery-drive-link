# Add Logo Collection Gallery

## What will change
- Add a new **Logo Collection** page at `/logos`.
- Reuse the existing gallery viewer, loading images from Google Drive folder `1jEGi0X02cuKgqdikr5slB-u4zzWRt8fJ`.
- Update the secure image-loading function to support the existing flyer folder and the new logo folder without exposing the Google API key.
- Add a **Logo Collection** link to the site header so visitors can reach the new page.
- Keep the existing flyer gallery and contact page working as they do now.

## Technical details
- The browser will request a named collection (`flyers` or `logos`) rather than sending arbitrary folder IDs.
- The backend function will map `logos` to the supplied Drive folder and continue using the configured folder secret for `flyers`.
- The shared gallery will accept a collection option so both pages use the same loading, error, grid, and full-height image dialog behavior.
- Verify the app build and both gallery pages after implementation.
