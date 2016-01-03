import android.util.Log;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;

import org.ekstep.genieservices.sdks.Telemetry;
import org.ekstep.genieservices.sdks.UserProfile;
import org.ekstep.genieservices.sdks.Content;
import org.ekstep.genieservices.sdks.GenieServices;
import org.ekstep.genieservices.sdks.response.IResponseHandler;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;
import java.util.HashMap;

public class GenieService extends CordovaPlugin {

	public static final String TAG = "Genie Service Plugin";

	private Telemetry telemetry;
    private UserProfile userProfile;
    private GenieServices genieServices;
    private Content content;

	public GenieService() {
		System.out.println("Genie Service Constructor..........");
    }

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        
    }

    public void onDestroy() {
        if(null != userProfile) {
            System.out.println("Calling UserProfile finish...........");
            userProfile.finish();
        }
        super.onDestroy();
    }

    public boolean execute(final String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        CordovaActivity activity = (CordovaActivity) this.cordova.getActivity();
        System.out.println("Genie Service execute...........");
        if (null == telemetry) {
            if (null != activity) {
                telemetry = new Telemetry(activity);
            }
        }
        if(null == userProfile) {
            if (null != activity) {
                userProfile = new UserProfile(activity);    
            }
        }
        if(null == genieServices) {
            if (null != activity) {
                genieServices = new GenieServices(activity);    
            }
        }
        if(null == content) {
            if(null != activity) {
                content = new Content(activity);
                System.out.println("Content is initialized...");
                content.seed(new GenieServicesListResponse(callbackContext));
                System.out.println("Content seed completed...");
            }
        }
        Log.v(TAG, "GenieService received:" + action);
        System.out.println("Genie Service action: " + action);
        if(action.equals("sendTelemetry")) {
            if (args.length() != 1) {
                callbackContext.error(getErrorJSONObject("INVALID_ACTION", null));
            	return false;
			}
            String data = args.getString(0);
            sendTelemetry(data, callbackContext);
        } else if(action.equals("getCurrentUser")) {
            userProfile.getCurrentUser(new UserProfileResponse(callbackContext));
        } else if(action.equals("getMetaData")) {
            genieServices.getMetaData(new GenieServicesResponse(callbackContext));
        } else if(action.equals("getContent")) {
            // content.getList(new GenieServicesListResponse(callbackContext));
            String contentId = args.getString(0);
            content.get(contentId, new GenieServicesResponse(callbackContext));
        }
        return true;
    }

    private void sendTelemetry(String data, CallbackContext callbackContext) {
    	if (null != data) {
    		telemetry.send(data, new TelemetryResponse(callbackContext));
    	}
    }

    private JSONObject getErrorJSONObject(String errorCode, String errorParam) {
    	Map<String, Object> error = new HashMap<String, Object>();
        error.put("status", "error");
        JSONObject obj = new JSONObject(error);
        try {
        	if (null != errorCode)
            	error.put("errorCode", errorCode);
            if (null != errorParam)
                error.put("errorParam", errorParam);
            obj = new JSONObject(error);
        } catch(Exception e) {
        }
        return obj;
    }

}