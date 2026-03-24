import 'package:flutter/material.dart';
import 'models.dart';

const List<OnboardingSlide> onboardingSlides = [
  OnboardingSlide(
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_Light_walkthrough%201-UduSycaCmr5FhzkOwy6vmAiSWXudrE.png',
    title: 'Empower Your Home, Simplify Your Life',
    description: 'Transform your living space into a smarter, more connected home with Smartify. All at your fingertips.',
  ),
  OnboardingSlide(
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_Light_walkthrough%202-1HiWczl5vJU4B3DJTrmCyawGk0vmNi.png',
    title: 'Effortless Control, Automate, & Secure',
    description: 'Smartify empowers you to control your devices, & automate your routines. Embrace a world where your home adapts to your needs.',
  ),
  OnboardingSlide(
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_Light_walkthrough%203-TW0eyFWADkJ5RAyTrmtOzacE5l7jrI.png',
    title: 'Efficiency that Saves, Comfort that Lasts.',
    description: 'Take control of your home\'s energy usage, set preferences, and enjoy a space that adapts to your needs while saving power.',
  ),
];

const List<Country> countries = [
  Country(code: 'AF', name: 'Afghanistan', flag: '🇦🇫'),
  Country(code: 'AL', name: 'Albania', flag: '🇦🇱'),
  Country(code: 'DZ', name: 'Algeria', flag: '🇩🇿'),
  Country(code: 'AD', name: 'Andorra', flag: '🇦🇩'),
  Country(code: 'AO', name: 'Angola', flag: '🇦🇴'),
  Country(code: 'AR', name: 'Argentina', flag: '🇦🇷'),
  Country(code: 'AU', name: 'Australia', flag: '🇦🇺'),
  Country(code: 'BR', name: 'Brazil', flag: '🇧🇷'),
  Country(code: 'CA', name: 'Canada', flag: '🇨🇦'),
  Country(code: 'CN', name: 'China', flag: '🇨🇳'),
  Country(code: 'FR', name: 'France', flag: '🇫🇷'),
  Country(code: 'DE', name: 'Germany', flag: '🇩🇪'),
  Country(code: 'IN', name: 'India', flag: '🇮🇳'),
  Country(code: 'JP', name: 'Japan', flag: '🇯🇵'),
  Country(code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪'),
  Country(code: 'GB', name: 'United Kingdom', flag: '🇬🇧'),
  Country(code: 'US', name: 'United States of America', flag: '🇺🇸'),
];

const List<Map<String, dynamic>> defaultRooms = [
  {'id': 'living', 'name': 'Living Room', 'icon': Icons.weekend},
  {'id': 'bedroom', 'name': 'Bedroom', 'icon': Icons.bed},
  {'id': 'bathroom', 'name': 'Bathroom', 'icon': Icons.bathtub},
  {'id': 'kitchen', 'name': 'Kitchen', 'icon': Icons.restaurant},
  {'id': 'study', 'name': 'Study Room', 'icon': Icons.school},
  {'id': 'dining', 'name': 'Dining Room', 'icon': Icons.dining},
  {'id': 'backyard', 'name': 'Backyard', 'icon': Icons.park},
];

const List<Device> nearbyDevices = [
  Device(id: '1', name: 'Smart Lamp', type: DeviceType.lamp),
  Device(id: '2', name: 'Smart V1 CCTV', type: DeviceType.cctv),
  Device(id: '3', name: 'Smart Speaker', type: DeviceType.speaker),
  Device(id: '4', name: 'Router', type: DeviceType.router),
  Device(id: '5', name: 'Air Conditioner', type: DeviceType.ac),
];

const List<Device> manualDevices = [
  Device(id: '1', name: 'Smart V1 CCTV', type: DeviceType.cctv),
  Device(id: '2', name: 'Smart Webcam', type: DeviceType.webcam),
  Device(id: '3', name: 'Smart V2 CCTV', type: DeviceType.cctv),
  Device(id: '4', name: 'Smart Lamp', type: DeviceType.lamp),
  Device(id: '5', name: 'Smart Speaker', type: DeviceType.speaker),
  Device(id: '6', name: 'Router', type: DeviceType.router),
];

const List<String> categories = [
  'Popular',
  'Lightning',
  'Camera',
  'Electrical',
  'Security',
  'Entertainment',
];

const List<String> roomTabs = [
  'All Rooms',
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Bathroom',
];

const WeatherData mockWeather = WeatherData(
  temperature: 20,
  city: 'New York City, USA',
  condition: 'Today Cloudy',
  aqi: 92,
  humidity: 78.2,
  windSpeed: 2.0,
);

const List<Map<String, dynamic>> homeDevices = [
  {'id': 1, 'name': 'Smart Lamp', 'room': 'Living Room', 'type': DeviceType.lamp, 'connection': 'wifi', 'isOn': true, 'hasImage': false},
  {'id': 2, 'name': 'Smart V1 CCTV', 'room': 'Living Room', 'type': DeviceType.cctv, 'connection': 'wifi', 'isOn': true, 'hasImage': true},
  {'id': 3, 'name': 'Stereo Speaker', 'room': 'Living Room', 'type': DeviceType.speaker, 'connection': 'bluetooth', 'isOn': true, 'hasImage': false},
  {'id': 4, 'name': 'Router', 'room': 'Living Room', 'type': DeviceType.router, 'connection': 'wifi', 'isOn': true, 'hasImage': false},
  {'id': 5, 'name': 'Air Conditioner', 'room': 'Living Room', 'type': DeviceType.ac, 'connection': 'bluetooth', 'isOn': true, 'hasImage': false},
  {'id': 6, 'name': 'Smart Webcam', 'room': 'Living Room', 'type': DeviceType.webcam, 'connection': 'wifi', 'isOn': false, 'hasImage': false},
  {'id': 7, 'name': 'Smart V2 CCTV', 'room': 'Living Room', 'type': DeviceType.cctv, 'connection': 'wifi', 'isOn': false, 'hasImage': false},
  {'id': 8, 'name': 'Smart V3 CCTV', 'room': 'Living Room', 'type': DeviceType.cctv, 'connection': 'wifi', 'isOn': false, 'hasImage': false},
];

const List<Map<String, dynamic>> categoryCards = [
  {'icon': Icons.lightbulb_outline, 'label': 'Lightning', 'count': 12, 'bgColor': Color(0xFFFEF9C3), 'iconColor': Color(0xFFEAB308)},
  {'icon': Icons.videocam_outlined, 'label': 'Cameras', 'count': 8, 'bgColor': Color(0xFFFCE7F3), 'iconColor': Color(0xFFEC4899)},
  {'icon': Icons.flash_on, 'label': 'Electrical', 'count': 6, 'bgColor': Color(0xFFFEE2E2), 'iconColor': Color(0xFFEF4444)},
];

const List<Map<String, dynamic>> lightningDevices = [
  {'id': 1, 'name': 'Smart Lamp', 'room': 'Living Room', 'type': 'bulb', 'isOn': true},
  {'id': 2, 'name': 'Lamp', 'room': 'Bedroom', 'type': 'tube', 'isOn': true},
  {'id': 3, 'name': 'Smart Lamp', 'room': 'Bedroom', 'type': 'bulb', 'isOn': false},
  {'id': 4, 'name': 'Smart Lamp', 'room': 'Kitchen', 'type': 'bulb', 'isOn': true},
  {'id': 5, 'name': 'Lamp', 'room': 'Bathroom', 'type': 'tube', 'isOn': true},
  {'id': 6, 'name': 'Smart Lamp', 'room': 'Dining Room', 'type': 'bulb', 'isOn': false},
  {'id': 7, 'name': 'Smart Lamp', 'room': 'Toilet', 'type': 'bulb', 'isOn': false},
  {'id': 8, 'name': 'Lamp', 'room': 'Backyard', 'type': 'bulb', 'isOn': true},
];

const List<Map<String, dynamic>> cameraDevices = [
  {'id': 1, 'name': 'Smart V1 CCTV', 'room': 'Living Room', 'hasLive': true, 'isOn': true},
  {'id': 2, 'name': 'Smart V2 CCTV', 'room': 'Bedroom', 'hasLive': true, 'isOn': true},
  {'id': 3, 'name': 'Smart V3 CCTV', 'room': 'Kitchen', 'hasLive': true, 'isOn': true},
  {'id': 4, 'name': 'Smart V1 CCTV', 'room': 'Bathroom', 'hasLive': true, 'isOn': true},
  {'id': 5, 'name': 'Smart Webcam', 'room': 'Toilet', 'hasLive': false, 'isOn': false},
  {'id': 6, 'name': 'Smart V1 CCTV', 'room': 'Dining Room', 'hasLive': false, 'isOn': false},
  {'id': 7, 'name': 'Smart V2 CCTV', 'room': 'Backyard', 'hasLive': false, 'isOn': false},
  {'id': 8, 'name': 'Smart V3 CCTV', 'room': 'Backyard', 'hasLive': false, 'isOn': false},
];

const List<Map<String, dynamic>> automations = [
  {'id': 1, 'name': 'Turn ON All the Lights', 'tasks': 1, 'isOn': true, 'triggerColor': Color(0xFF22C55E), 'actionColor': Color(0xFFFB923C)},
  {'id': 2, 'name': 'Go to Office', 'tasks': 2, 'isOn': true, 'triggerColor': Color(0xFFEF4444), 'actionColor': Color(0xFF3B82F6)},
  {'id': 3, 'name': 'Energy Saver Mode', 'tasks': 2, 'isOn': false, 'triggerColor': Color(0xFF3B82F6), 'actionColor': Color(0xFFA855F7)},
  {'id': 4, 'name': 'Work Mode Activate', 'tasks': 1, 'isOn': true, 'triggerColor': Color(0xFF3B82F6), 'actionColor': Color(0xFF6B7280)},
  {'id': 5, 'name': 'Night Time Bliss', 'tasks': 2, 'isOn': false, 'triggerColor': Color(0xFF6366F1), 'actionColor': Color(0xFFFACC15)},
];
