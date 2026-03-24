import 'package:flutter/material.dart';
import 'theme/app_theme.dart';
import 'models/models.dart';
import 'screens/screens.dart';

void main() {
  runApp(const SmartifyApp());
}

class SmartifyApp extends StatelessWidget {
  const SmartifyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smartify',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const SmartifyHome(),
    );
  }
}

class SmartifyHome extends StatefulWidget {
  const SmartifyHome({super.key});

  @override
  State<SmartifyHome> createState() => _SmartifyHomeState();
}

class _SmartifyHomeState extends State<SmartifyHome> {
  String _currentScreen = 'splash';
  final List<String> _history = [];

  // App state
  Device? _connectingDevice;
  String _categoryFilter = 'lightning';

  void _navigateTo(String screen) {
    setState(() {
      _history.add(_currentScreen);
      _currentScreen = screen;
    });
  }

  void _goBack() {
    if (_history.isNotEmpty) {
      setState(() {
        _currentScreen = _history.removeLast();
      });
    }
  }

  void _navigateReset(String screen) {
    setState(() {
      _history.clear();
      _currentScreen = screen;
    });
  }

  Widget _buildScreen() {
    switch (_currentScreen) {
      case 'splash':
        return const SplashScreen();

      case 'onboarding':
        return OnboardingScreen(
          onComplete: () => _navigateTo('welcome'),
          onSkip: () => _navigateTo('welcome'),
        );

      case 'welcome':
        return WelcomeScreen(
          onSignUp: () => _navigateTo('signup'),
          onSignIn: () => _navigateTo('signin'),
          onSocialLogin: (p) {
            _navigateTo('select-country');
          },
        );

      case 'signup':
        return SignUpScreen(
          onBack: _goBack,
          onSignUp: () {
            _navigateTo('select-country');
          },
          onSignIn: () => _navigateTo('signin'),
          onSocialLogin: () {
            _navigateTo('select-country');
          },
        );

      case 'signin':
        return SignInScreen(
          onBack: _goBack,
          onSignIn: () {
            _navigateTo('home-dashboard');
          },
          onForgotPassword: () => _navigateTo('forgot-password'),
          onSocialLogin: () {
            _navigateTo('home-dashboard');
          },
        );

      case 'forgot-password':
        return ForgotPasswordScreen(
          onBack: _goBack,
          onSendOTP: () {
            _navigateTo('otp');
          },
        );

      case 'otp':
        return OtpScreen(
          onBack: _goBack,
          onVerify: () => _navigateTo('create-new-password'),
        );

      case 'create-new-password':
        return CreateNewPasswordScreen(
          onBack: _goBack,
          onSave: () => _navigateTo('password-success'),
        );

      case 'password-success':
        return PasswordSuccessScreen(
          onGoHome: () => _navigateTo('home-dashboard'),
        );

      case 'select-country':
        return SelectCountryScreen(
          onBack: _goBack,
          onContinue: (country) {
            _navigateTo('add-home-name');
          },
          onSkip: () => _navigateTo('add-home-name'),
        );

      case 'add-home-name':
        return AddHomeNameScreen(
          onBack: _goBack,
          onContinue: (name) {
            _navigateTo('add-rooms');
          },
          onSkip: () => _navigateTo('add-rooms'),
        );

      case 'add-rooms':
        return AddRoomsScreen(
          onBack: _goBack,
          onContinue: (rooms) {
            _navigateTo('set-location');
          },
          onSkip: () => _navigateTo('set-location'),
        );

      case 'set-location':
        return SetLocationScreen(
          onBack: _goBack,
          onContinue: (addr) {
            _navigateTo('home-dashboard');
          },
          onSkip: () => _navigateTo('home-dashboard'),
        );

      case 'home-dashboard':
        return HomeDashboardScreen(
          onAddDevice: () => _navigateTo('add-device-nearby'),
        );

      case 'home-with-devices':
        return HomeWithDevicesScreen(
          onNavigate: (s) {
            if (s == 'lightning' || s == 'cameras') {
              _categoryFilter = s;
              _navigateTo('category-devices');
            } else if (s == 'smart-scenes') {
              _navigateTo('smart-scenes');
            } else if (s == 'home-devices') {
              _navigateTo('home-with-devices');
            }
          },
          onShowAddMenu: () {},
          onShowSwitchHome: () {},
        );

      case 'add-device-nearby':
        return AddDeviceNearbyScreen(
          onBack: _goBack,
          onManualAdd: () => _navigateTo('add-device-manual'),
          onConnectAll: () {
            _connectingDevice = Device(
              id: '1',
              name: 'Smart V1 CCTV',
              type: DeviceType.cctv,
            );
            _navigateTo('connect-device');
          },
          onScan: () => _navigateTo('scan-device'),
        );

      case 'add-device-manual':
        return AddDeviceManualScreen(
          onBack: _goBack,
          onNearbyDevices: () => _navigateTo('add-device-nearby'),
          onSelectDevice: (device) {
            _connectingDevice = device;
            _navigateTo('connect-device');
          },
          onScan: () => _navigateTo('scan-device'),
        );

      case 'scan-device':
        return ScanDeviceScreen(
          onClose: _goBack,
          onManualEntry: () => _navigateTo('manual-code'),
        );

      case 'manual-code':
        return ManualCodeScreen(
          onBack: _goBack,
          onContinue: () {
            _connectingDevice = Device(
              id: '3',
              name: 'Stereo Speaker',
              type: DeviceType.speaker,
            );
            _navigateTo('connecting-device');
          },
        );

      case 'connect-device':
        return ConnectDeviceScreen(
          device: _connectingDevice ??
              Device(id: '1', name: 'Smart Lamp', type: DeviceType.lamp),
          onBack: _goBack,
          onConnect: () => _navigateTo('connecting-device'),
        );

      case 'connecting-device':
        return ConnectingDeviceScreen(
          device: _connectingDevice ??
              Device(id: '1', name: 'Smart Lamp', type: DeviceType.lamp),
          onBack: _goBack,
          onConnected: () => _navigateTo('device-connected'),
          showTabs: _connectingDevice?.type == DeviceType.cctv,
        );

      case 'device-connected':
        return DeviceConnectedScreen(
          device: _connectingDevice ??
              Device(id: '1', name: 'Smart Lamp', type: DeviceType.lamp),
          onGoHome: () => _navigateTo('home-dashboard'),
          onControlDevice: () => _navigateTo('home-dashboard'),
        );

      case 'category-devices':
        return CategoryDevicesScreen(
          category: _categoryFilter,
          onBack: _goBack,
          onNavigate: (s) {
            if (s == 'control-lamp') {
              _navigateTo('control-lamp');
            } else if (s == 'control-cctv') {
              _navigateTo('control-cctv');
            }
          },
        );

      case 'control-lamp':
        return ControlLampScreen(onBack: _goBack);

      case 'control-cctv':
        return ControlCCTCScreen(onBack: _goBack);

      case 'control-ac':
        return ControlACScreen(onBack: _goBack);

      case 'control-speaker':
        return ControlSpeakerScreen(onBack: _goBack);

      case 'smart-scenes':
        return SmartScenesScreen(
          onNavigate: (s) {
            if (s == 'create-scene') {
              _navigateTo('create-scene');
            } else if (s == 'home-devices') {
              _navigateTo('home-with-devices');
            }
          },
        );

      case 'create-scene':
        return CreateSceneScreen(
          onBack: _goBack,
          onNavigate: (s) {
            if (s == 'weather-triggers') {
              _navigateTo('weather-triggers');
            }
          },
        );

      case 'weather-triggers':
        return WeatherTriggersScreen(onBack: _goBack);

      default:
        return const SplashScreen();
    }
  }

  @override
  Widget build(BuildContext context) {
    return _buildScreen();
  }
}
