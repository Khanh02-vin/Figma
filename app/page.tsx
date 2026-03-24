"use client"

import { useState, useEffect } from "react"
import {
  SplashScreen,
  OnboardingScreen,
  WelcomeScreen,
  SignUpScreen,
  SignInScreen,
  ForgotPasswordScreen,
  SelectCountryScreen,
  AddHomeNameScreen,
  AddRoomsScreen,
  SetLocationScreen,
  OtpScreen,
  CreateNewPasswordScreen,
  PasswordSuccessScreen,
  HomeDashboardScreen,
  AddDeviceNearbyScreen,
  AddDeviceManualScreen,
  ScanDeviceScreen,
  ManualCodeScreen,
  ConnectDeviceScreen,
  ConnectingDeviceScreen,
  DeviceConnectedScreen,
  VoiceAssistantScreen,
  NotificationScreen,
  ChatScreen,
  LightningScreen,
  CamerasScreen,
  ControlLampScreen,
  ControlCCTVScreen,
  ControlSpeakerScreen,
  ControlACScreen,
  WeatherTriggersScreen,
  TemperatureTriggerScreen,
  SmartScenesScreen,
  CreateSceneScreen,
  TriggerConfigScreen,
  ControlSingleDeviceScreen,
  SelectFunctionScreen,
  HumidityTriggerScreen,
  WeatherTriggerScreen,
  SunriseSunsetTriggerScreen,
  WindSpeedTriggerScreen,
  LocationChangesTriggerScreen,
  ArriveAtLocationScreen,
  SelectSmartSceneScreen,
  ScheduleTimeTriggerScreen,
  DelayActionScreen,
  ManageSmartScenesScreen,
  HomeManagementScreen,
  MyHomeScreen,
  RoomManagementScreen,
  ReportsScreen,
  DeviceReportDetailScreen,
  AccountSettingsScreen,
  SmartScenesLogsScreen,
} from "@/components/screens"

type Screen =
  | "splash"
  | "onboarding"
  | "welcome"
  | "signup"
  | "signin"
  | "forgot-password"
  | "otp"
  | "create-new-password"
  | "password-success"
  | "select-country"
  | "add-home-name"
  | "add-rooms"
  | "set-location"
  | "home-dashboard"
  | "add-device-nearby"
  | "add-device-manual"
  | "scan-device"
  | "manual-code"
  | "connect-device"
  | "connecting-device"
  | "device-connected"
  | "voice-assistant"
  | "notifications"
  | "chat"
  | "lightning"
  | "cameras"
  | "control-lamp"
  | "control-cctv"
  | "control-speaker"
  | "control-ac"
  | "weather-triggers"
  | "temperature-trigger"
  | "trigger-config"
  | "smart-scenes"
  | "create-scene"
  | "control-single-device"
  | "select-function"
  | "humidity-trigger"
  | "weather-trigger"
  | "sunrise-sunset-trigger"
  | "wind-speed-trigger"
  | "location-changes"
  | "arrive-at"
  | "select-smart-scene"
  | "schedule-time-trigger"
  | "delay-action"
  | "manage-smart-scenes"
  | "smart-scenes-logs"
  | "home-management"
  | "my-home"
  | "room-management"
  | "reports"
  | "device-report-detail"
  | "account-settings"
  | "complete"

interface SelectedDevice {
  id: string
  name: string
  type: "lamp" | "cctv" | "speaker"
}

export default function SmartifyApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("smart-scenes")
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>([])
  const [currentHome, setCurrentHome] = useState("My Home")
  const [selectedDevice, setSelectedDevice] = useState<SelectedDevice>({
    id: "1",
    name: "Smart Lamp",
    type: "lamp",
  })

  // Auto-advance from splash screen
  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("onboarding")
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [currentScreen])

  const navigateTo = (screen: Screen) => {
    setNavigationHistory((prev) => [...prev, currentScreen])
    setCurrentScreen(screen)
  }

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const prevScreen = navigationHistory[navigationHistory.length - 1]
      setNavigationHistory((prev) => prev.slice(0, -1))
      setCurrentScreen(prevScreen)
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen />

      case "onboarding":
        return (
          <OnboardingScreen
            onComplete={() => navigateTo("welcome")}
            onSkip={() => navigateTo("welcome")}
          />
        )

      case "welcome":
        return (
          <WelcomeScreen
            onSignUp={() => navigateTo("signup")}
            onSignIn={() => navigateTo("signin")}
            onSocialLogin={() => {
              navigateTo("select-country")
            }}
          />
        )

      case "signup":
        return (
          <SignUpScreen
            onBack={goBack}
            onSignUp={() => {
              navigateTo("select-country")
            }}
            onSignIn={() => navigateTo("signin")}
            onSocialLogin={() => {
              navigateTo("select-country")
            }}
          />
        )

      case "signin":
        return (
          <SignInScreen
            onBack={goBack}
            onSignIn={() => {
              navigateTo("home-dashboard")
            }}
            onForgotPassword={() => navigateTo("forgot-password")}
            onSocialLogin={() => {
              navigateTo("home-dashboard")
            }}
          />
        )

      case "forgot-password":
        return (
          <ForgotPasswordScreen
            onBack={goBack}
            onSendOTP={() => {
              navigateTo("otp")
            }}
          />
        )

      case "otp":
        return (
          <OtpScreen
            onBack={goBack}
            onVerify={() => navigateTo("create-new-password")}
          />
        )

      case "create-new-password":
        return (
          <CreateNewPasswordScreen
            onBack={goBack}
            onSave={() => navigateTo("password-success")}
          />
        )

      case "password-success":
        return (
          <PasswordSuccessScreen
            onGoHome={() => navigateTo("home-dashboard")}
          />
        )

      case "select-country":
        return (
          <SelectCountryScreen
            onBack={goBack}
            onContinue={() => {
              navigateTo("add-home-name")
            }}
            onSkip={() => navigateTo("add-home-name")}
          />
        )

      case "add-home-name":
        return (
          <AddHomeNameScreen
            onBack={goBack}
            onContinue={() => {
              navigateTo("add-rooms")
            }}
            onSkip={() => navigateTo("add-rooms")}
          />
        )

      case "add-rooms":
        return (
          <AddRoomsScreen
            onBack={goBack}
            onContinue={() => {
              navigateTo("set-location")
            }}
            onSkip={() => navigateTo("set-location")}
          />
        )

      case "set-location":
        return (
          <SetLocationScreen
            onBack={goBack}
            onContinue={() => {
              navigateTo("home-dashboard")
            }}
            onSkip={() => navigateTo("home-dashboard")}
          />
        )

      case "home-dashboard":
        return (
          <HomeDashboardScreen
            currentHome={currentHome}
            onAddDevice={() => navigateTo("add-device-nearby")}
            onScan={() => navigateTo("scan-device")}
            onVoiceAssistant={() => navigateTo("voice-assistant")}
            onNotifications={() => navigateTo("notifications")}
            onShowSwitchHome={(home) => setCurrentHome(home || currentHome)}
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "add-device-nearby":
        return (
          <AddDeviceNearbyScreen
            onBack={goBack}
            onManualAdd={() => navigateTo("add-device-manual")}
            onConnectAll={() => {
              setSelectedDevice({ id: "1", name: "Smart V1 CCTV", type: "cctv" })
              navigateTo("connect-device")
            }}
            onScan={() => navigateTo("scan-device")}
          />
        )

      case "add-device-manual":
        return (
          <AddDeviceManualScreen
            onBack={goBack}
            onNearbyDevices={() => navigateTo("add-device-nearby")}
            onSelectDevice={(device) => {
              const deviceType =
                device.name.toLowerCase().includes("lamp")
                  ? "lamp"
                  : device.name.toLowerCase().includes("speaker")
                    ? "speaker"
                    : "cctv"
              setSelectedDevice({
                id: device.id,
                name: device.name,
                type: deviceType,
              })
              navigateTo("connect-device")
            }}
            onScan={() => navigateTo("scan-device")}
          />
        )

      case "scan-device":
        return (
          <ScanDeviceScreen
            onClose={goBack}
            onManualEntry={() => navigateTo("manual-code")}
          />
        )

      case "manual-code":
        return (
          <ManualCodeScreen
            onBack={goBack}
            onContinue={() => {
              setSelectedDevice({ id: "3", name: "Stereo Speaker", type: "speaker" })
              navigateTo("connecting-device")
            }}
          />
        )

      case "connect-device":
        return (
          <ConnectDeviceScreen
            device={selectedDevice}
            onBack={goBack}
            onConnect={() => navigateTo("connecting-device")}
          />
        )

      case "connecting-device":
        return (
          <ConnectingDeviceScreen
            device={selectedDevice}
            onBack={goBack}
            onConnected={() => navigateTo("device-connected")}
            showTabs={selectedDevice.type === "cctv"}
          />
        )

      case "device-connected":
        return (
          <DeviceConnectedScreen
            device={selectedDevice}
            onGoHome={() => navigateTo("home-dashboard")}
            onControlDevice={() => navigateTo("home-dashboard")}
          />
        )

      case "voice-assistant":
        return (
          <VoiceAssistantScreen
            onClose={goBack}
          />
        )

      case "notifications":
        return (
          <NotificationScreen
            onBack={goBack}
          />
        )

      case "chat":
        return (
          <ChatScreen
            onBack={goBack}
          />
        )

      case "lightning":
        return (
          <LightningScreen
            onBack={goBack}
          />
        )

      case "cameras":
        return (
          <CamerasScreen
            onBack={goBack}
          />
        )

      case "control-lamp":
        return <ControlLampScreen onBack={goBack} />

      case "control-cctv":
        return <ControlCCTVScreen onBack={goBack} />

      case "control-speaker":
        return <ControlSpeakerScreen onBack={goBack} />

      case "control-ac":
        return <ControlACScreen onBack={goBack} />

      case "weather-triggers":
        return (
          <WeatherTriggersScreen
            onBack={goBack}
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "temperature-trigger":
        return (
          <TemperatureTriggerScreen
            onBack={goBack}
            onContinue={() => navigateTo("trigger-config")}
          />
        )

      case "trigger-config":
        return (
          <TriggerConfigScreen
            onBack={goBack}
            onSave={() => navigateTo("smart-scenes")}
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "smart-scenes":
        return (
          <SmartScenesScreen
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "create-scene":
        return (
          <CreateSceneScreen
            onBack={goBack}
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "control-single-device":
        return (
          <ControlSingleDeviceScreen
            onBack={goBack}
          />
        )

      case "select-function":
        return (
          <SelectFunctionScreen
            onBack={goBack}
            onConfirm={() => navigateTo("trigger-config")}
          />
        )

      case "humidity-trigger":
        return (
          <HumidityTriggerScreen
            onBack={goBack}
            onContinue={() => navigateTo("trigger-config")}
          />
        )

      case "weather-trigger":
        return (
          <WeatherTriggerScreen
            onBack={goBack}
            onContinue={() => navigateTo("trigger-config")}
          />
        )

      case "sunrise-sunset-trigger":
        return (
          <SunriseSunsetTriggerScreen
            onBack={goBack}
            onContinue={() => navigateTo("trigger-config")}
          />
        )

      case "wind-speed-trigger":
        return (
          <WindSpeedTriggerScreen
            onBack={goBack}
            onContinue={() => navigateTo("trigger-config")}
          />
        )

      case "location-changes":
        return (
          <LocationChangesTriggerScreen
            onBack={goBack}
            onArrive={() => navigateTo("arrive-at")}
          />
        )

      case "arrive-at":
        return (
          <ArriveAtLocationScreen
            onBack={goBack}
            onConfirm={() => navigateTo("trigger-config")}
          />
        )

      case "select-smart-scene":
        return (
          <SelectSmartSceneScreen
            onBack={goBack}
            onConfirm={() => navigateTo("trigger-config")}
          />
        )

      case "schedule-time-trigger":
        return (
          <ScheduleTimeTriggerScreen
            onBack={goBack}
            onContinue={() => navigateTo("trigger-config")}
          />
        )

      case "delay-action":
        return (
          <DelayActionScreen
            onBack={goBack}
            onContinue={() => navigateTo("trigger-config")}
          />
        )

      case "manage-smart-scenes":
        return (
          <ManageSmartScenesScreen
            onBack={goBack}
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "smart-scenes-logs":
        return (
          <SmartScenesLogsScreen
            onBack={goBack}
          />
        )

      case "home-management":
        return (
          <HomeManagementScreen
            onBack={goBack}
            onNavigate={(screen) => navigateTo(screen as Screen)}
            onSelectHome={() => navigateTo("my-home")}
          />
        )

      case "my-home":
        return (
          <MyHomeScreen
            onBack={goBack}
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "room-management":
        return (
          <RoomManagementScreen
            onBack={goBack}
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "reports":
        return (
          <ReportsScreen
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "device-report-detail":
        return (
          <DeviceReportDetailScreen
            onBack={goBack}
          />
        )

      case "account-settings":
        return (
          <AccountSettingsScreen
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        )

      case "complete":
        return (
          <div className="mobile-container flex flex-col items-center justify-center bg-primary px-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                {"You're All Set!"}
              </h1>
              <p className="text-white/80 mb-8">
                Welcome to your smart home journey with Smartify.
              </p>
              <button
                onClick={() => {
                  setNavigationHistory([])
                  setCurrentScreen("splash")
                }}
                className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                Start Over (Demo)
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl ring-8 ring-foreground/10">
        {renderScreen()}
      </div>
    </main>
  )
}
