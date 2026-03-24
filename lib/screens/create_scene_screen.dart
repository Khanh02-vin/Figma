import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class CreateSceneScreen extends StatelessWidget {
  final VoidCallback onBack;
  final Function(String) onNavigate;

  const CreateSceneScreen({
    super.key,
    required this.onBack,
    required this.onNavigate,
  });

  final _triggers = const [
    {'icon': Icons.touch_app, 'iconColor': Color(0xFF3B82F6), 'bgColor': Color(0xFFDBEAFE), 'title': 'Tap-to-Run', 'desc': 'Example: Turn on all the lights in the living room in one tap.'},
    {'icon': Icons.wb_sunny_outlined, 'iconColor': Color(0xFFF97316), 'bgColor': Color(0xFFFEF3C7), 'title': 'When Weather Changes', 'desc': 'Example: When the surrounding temperature is more than 25°C.'},
    {'icon': Icons.location_on_outlined, 'iconColor': Color(0xFFEF4444), 'bgColor': Color(0xFFFEE2E2), 'title': 'When Location Changes', 'desc': 'Example: When you get home or leave the house.'},
    {'icon': Icons.schedule, 'iconColor': Color(0xFF22C55E), 'bgColor': Color(0xFFDCFCE7), 'title': 'Schedule Time', 'desc': 'Example: When it\'s 08:00 AM, when it\'s morning, when it\'s evening.'},
    {'icon': Icons.electrical_services, 'iconColor': Color(0xFF60A5FA), 'bgColor': Color(0xFFDBEAFE), 'title': 'When Device Status Changes', 'desc': 'Example: When an unusual activity is detected.'},
    {'icon': Icons.shield_outlined, 'iconColor': Color(0xFFA855F7), 'bgColor': Color(0xFFF3E8FF), 'title': 'Change Arm Mode', 'desc': 'Example: Disarmed, arm stay, or arm away via gateway.'},
    {'icon': Icons.notifications_active_outlined, 'iconColor': Color(0xFFEF4444), 'bgColor': Color(0xFFFEE2E2), 'title': 'When Alarm Triggered', 'desc': 'Example: When a fire alarm or emergency alarm is triggered.'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Row(
                children: [
                  IconButton(onPressed: onBack, icon: const Icon(Icons.arrow_back, size: 24)),
                  const Expanded(
                    child: Text('Create Scene', textAlign: TextAlign.center, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600)),
                  ),
                  const SizedBox(width: 48),
                ],
              ),
            ),
            // Triggers list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: _triggers.length,
                itemBuilder: (ctx, i) {
                  final t = _triggers[i];
                  final isWeather = t['title'] == 'When Weather Changes';
                  return GestureDetector(
                    onTap: isWeather ? () => onNavigate('weather-triggers') : null,
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 1),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        border: i < _triggers.length - 1
                            ? Border(bottom: BorderSide(color: AppColors.border.withValues(alpha: 0.5), width: 0.5))
                            : null,
                      ),
                      child: Row(
                        children: [
                          Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(color: t['bgColor'] as Color, shape: BoxShape.circle),
                            child: Icon(t['icon'] as IconData, size: 20, color: t['iconColor'] as Color),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(t['title'] as String, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                                const SizedBox(height: 2),
                                Text(
                                  t['desc'] as String,
                                  style: TextStyle(fontSize: 12, color: AppColors.mutedForeground),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          ),
                          Icon(Icons.chevron_right, color: AppColors.mutedForeground),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
