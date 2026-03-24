import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class WeatherTriggersScreen extends StatelessWidget {
  final VoidCallback onBack;

  const WeatherTriggersScreen({super.key, required this.onBack});

  final _options = const [
    {'icon': Icons.thermostat, 'iconColor': Color(0xFFEF4444), 'bgColor': Color(0xFFFEE2E2), 'title': 'Temperature'},
    {'icon': Icons.water_drop, 'iconColor': Color(0xFF3B82F6), 'bgColor': Color(0xFFDBEAFE), 'title': 'Humidity'},
    {'icon': Icons.wb_sunny_outlined, 'iconColor': Color(0xFFF97316), 'bgColor': Color(0xFFFEF3C7), 'title': 'Weather'},
    {'icon': Icons.wb_twilight, 'iconColor': Color(0xFFFBBF24), 'bgColor': Color(0xFFFEF9C3), 'title': 'Sunrise / Sunset'},
    {'icon': Icons.air, 'iconColor': Color(0xFF60A5FA), 'bgColor': Color(0xFFDBEAFE), 'title': 'Wind Speed'},
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
                    child: Text('When Weather Changes', textAlign: TextAlign.center, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600)),
                  ),
                  const SizedBox(width: 48),
                ],
              ),
            ),
            // Options list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: _options.length,
                itemBuilder: (ctx, i) {
                  final opt = _options[i];
                  return GestureDetector(
                    onTap: () {},
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
                      margin: const EdgeInsets.only(bottom: 1),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        border: i < _options.length - 1
                            ? Border(bottom: BorderSide(color: AppColors.border.withValues(alpha: 0.5), width: 0.5))
                            : null,
                      ),
                      child: Row(
                        children: [
                          Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(color: opt['bgColor'] as Color, shape: BoxShape.circle),
                            child: Icon(opt['icon'] as IconData, size: 20, color: opt['iconColor'] as Color),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Text(
                              opt['title'] as String,
                              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500),
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
