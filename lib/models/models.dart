enum DeviceType { lamp, cctv, speaker, router, ac, webcam }

class Device {
  final String id;
  final String name;
  final DeviceType type;
  final String connection;
  final bool isOn;
  final bool hasImage;

  const Device({
    required this.id,
    required this.name,
    required this.type,
    this.connection = 'wifi',
    this.isOn = false,
    this.hasImage = false,
  });

  Device copyWith({bool? isOn}) {
    return Device(
      id: id,
      name: name,
      type: type,
      connection: connection,
      isOn: isOn ?? this.isOn,
      hasImage: hasImage,
    );
  }
}

class Room {
  final String id;
  final String name;
  final String icon;

  const Room({required this.id, required this.name, required this.icon});
}

class Country {
  final String code;
  final String name;
  final String flag;

  const Country({
    required this.code,
    required this.name,
    required this.flag,
  });
}

class WeatherData {
  final int temperature;
  final String city;
  final String condition;
  final int aqi;
  final double humidity;
  final double windSpeed;

  const WeatherData({
    required this.temperature,
    required this.city,
    required this.condition,
    required this.aqi,
    required this.humidity,
    required this.windSpeed,
  });
}

class OnboardingSlide {
  final String imageUrl;
  final String title;
  final String description;

  const OnboardingSlide({
    required this.imageUrl,
    required this.title,
    required this.description,
  });
}

class Automation {
  final int id;
  final String name;
  final int tasks;
  final bool isOn;

  const Automation({
    required this.id,
    required this.name,
    required this.tasks,
    required this.isOn,
  });
}
