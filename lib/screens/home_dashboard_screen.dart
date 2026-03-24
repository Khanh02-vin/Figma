import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/data_constants.dart';

class HomeDashboardScreen extends StatefulWidget {
  final VoidCallback onAddDevice;

  const HomeDashboardScreen({super.key, required this.onAddDevice});

  @override
  State<HomeDashboardScreen> createState() => _HomeDashboardScreenState();
}

class _HomeDashboardScreenState extends State<HomeDashboardScreen> {
  String _selectedRoom = 'Living Room';
  int _activeNav = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.muted.withValues(alpha: 0.2),
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Row(
                children: [
                  Row(
                    children: [
                      const Text(
                        'My Home',
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(width: 4),
                      Icon(Icons.keyboard_arrow_down, color: AppColors.mutedForeground),
                    ],
                  ),
                  const Spacer(),
                  _CircleBtn(
                    child: const Icon(Icons.psychology, size: 24, color: AppColors.primary),
                  ),
                  const SizedBox(width: 8),
                  _CircleBtn(
                    child: const Icon(Icons.notifications_outlined, size: 24),
                    hasBadge: true,
                  ),
                ],
              ),
            ),
            // Content
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    // Weather card
                    Container(
                      margin: const EdgeInsets.all(16),
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text(
                                      '20',
                                      style: TextStyle(
                                        fontSize: 48,
                                        fontWeight: FontWeight.w300,
                                        color: Colors.white,
                                      ),
                                    ),
                                    const Text(
                                      '°C',
                                      style: TextStyle(
                                        fontSize: 18,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ],
                                ),
                                Text(
                                  mockWeather.city,
                                  style: TextStyle(
                                    fontSize: 13,
                                    color: Colors.white.withValues(alpha: 0.9),
                                  ),
                                ),
                                Text(
                                  mockWeather.condition,
                                  style: TextStyle(
                                    fontSize: 13,
                                    color: Colors.white.withValues(alpha: 0.8),
                                  ),
                                ),
                                const SizedBox(height: 12),
                                Row(
                                  children: [
                                    _WeatherChip(icon: Icons.air, label: 'AQI ${mockWeather.aqi}'),
                                    const SizedBox(width: 12),
                                    _WeatherChip(icon: Icons.water_drop, label: '${mockWeather.humidity.toStringAsFixed(0)}%'),
                                    const SizedBox(width: 12),
                                    _WeatherChip(icon: Icons.cloud, label: '${mockWeather.windSpeed} m/s'),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          // Sun/cloud illustration
                          SizedBox(
                            width: 96,
                            height: 72,
                            child: CustomPaint(
                              painter: _WeatherIconPainter(),
                            ),
                          ),
                        ],
                      ),
                    ),
                    // All Devices section
                    Container(
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(24),
                          topRight: Radius.circular(24),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.fromLTRB(16, 20, 16, 8),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  'All Devices',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                Icon(Icons.more_vert, color: AppColors.mutedForeground),
                              ],
                            ),
                          ),
                          // Room tabs
                          SizedBox(
                            height: 40,
                            child: ListView.builder(
                              scrollDirection: Axis.horizontal,
                              padding: const EdgeInsets.symmetric(horizontal: 16),
                              itemCount: roomTabs.length,
                              itemBuilder: (context, i) {
                                final room = roomTabs[i];
                                final isSelected = _selectedRoom == room;
                                return GestureDetector(
                                  onTap: () => setState(() => _selectedRoom = room),
                                  child: Container(
                                    margin: const EdgeInsets.only(right: 8),
                                    padding: const EdgeInsets.symmetric(horizontal: 16),
                                    decoration: BoxDecoration(
                                      color: isSelected ? AppColors.primary : AppColors.muted.withValues(alpha: 0.5),
                                      borderRadius: BorderRadius.circular(20),
                                      border: isSelected ? null : Border.all(color: AppColors.border),
                                    ),
                                    alignment: Alignment.center,
                                    child: Text(
                                      room,
                                      style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w500,
                                        color: isSelected ? Colors.white : AppColors.mutedForeground,
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
                          const SizedBox(height: 24),
                          // Empty state
                          Center(
                            child: Column(
                              children: [
                                const SizedBox(height: 32),
                                SizedBox(
                                  width: 128,
                                  height: 112,
                                  child: Stack(
                                    alignment: Alignment.center,
                                    children: [
                                      Positioned(
                                        top: 0,
                                        left: 16,
                                        child: Transform.rotate(
                                          angle: 0.1,
                                          child: Container(
                                            width: 96,
                                            height: 112,
                                            decoration: BoxDecoration(
                                              color: AppColors.muted.withValues(alpha: 0.3),
                                              borderRadius: BorderRadius.circular(12),
                                              border: Border.all(
                                                color: AppColors.mutedForeground.withValues(alpha: 0.3),
                                                width: 1.5,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      Container(
                                        width: 96,
                                        height: 112,
                                        decoration: BoxDecoration(
                                          color: Colors.white,
                                          borderRadius: BorderRadius.circular(12),
                                          border: Border.all(
                                            color: AppColors.primary.withValues(alpha: 0.3),
                                            width: 1.5,
                                          ),
                                        ),
                                        child: Center(
                                          child: Container(
                                            width: 32,
                                            height: 32,
                                            decoration: BoxDecoration(
                                              color: AppColors.primary.withValues(alpha: 0.2),
                                              borderRadius: BorderRadius.circular(8),
                                            ),
                                            child: Center(
                                              child: Container(
                                                width: 16,
                                                height: 16,
                                                decoration: BoxDecoration(
                                                  color: AppColors.primary.withValues(alpha: 0.4),
                                                  borderRadius: BorderRadius.circular(4),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 20),
                                const Text(
                                  'No Devices',
                                  style: TextStyle(
                                    fontSize: 17,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                const Text(
                                  "You haven't added a device yet.",
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: AppColors.mutedForeground,
                                  ),
                                ),
                                const SizedBox(height: 20),
                                ElevatedButton.icon(
                                  onPressed: widget.onAddDevice,
                                  icon: const Icon(Icons.add, size: 20),
                                  label: const Text('Add Device'),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.primary,
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(30),
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 24),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            // FABs
            Positioned(
              bottom: 80,
              right: 16,
              child: Column(
                children: [
                  Container(
                    width: 56,
                    height: 56,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.1),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: const Icon(Icons.mic, color: AppColors.primary, size: 24),
                  ),
                  const SizedBox(height: 12),
                  GestureDetector(
                    onTap: widget.onAddDevice,
                    child: Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: AppColors.primary.withValues(alpha: 0.3),
                            blurRadius: 12,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: const Icon(Icons.add, color: Colors.white, size: 28),
                    ),
                  ),
                ],
              ),
            ),
            // Bottom nav
            Container(
              color: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _NavItem(icon: Icons.home_outlined, label: 'Home', isActive: _activeNav == 0, onTap: () => setState(() => _activeNav = 0)),
                  _NavItem(icon: Icons.checklist, label: 'Smart', isActive: _activeNav == 1, onTap: () => setState(() => _activeNav = 1)),
                  _NavItem(icon: Icons.bar_chart, label: 'Reports', isActive: _activeNav == 2, onTap: () => setState(() => _activeNav = 2)),
                  _NavItem(icon: Icons.person_outline, label: 'Account', isActive: _activeNav == 3, onTap: () => setState(() => _activeNav = 3)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CircleBtn extends StatelessWidget {
  final Widget child;
  final bool hasBadge;
  const _CircleBtn({required this.child, this.hasBadge = false});
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: hasBadge ? const Color(0xFFFB923C) : AppColors.border, width: 1.5),
          ),
          child: Center(child: child),
        ),
        if (hasBadge)
          Positioned(
            top: 8,
            right: 8,
            child: Container(
              width: 8,
              height: 8,
              decoration: const BoxDecoration(
                color: Colors.red,
                shape: BoxShape.circle,
              ),
            ),
          ),
      ],
    );
  }
}

class _WeatherChip extends StatelessWidget {
  final IconData icon;
  final String label;
  const _WeatherChip({required this.icon, required this.label});
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, size: 14, color: Colors.white.withValues(alpha: 0.8)),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: Colors.white.withValues(alpha: 0.8),
          ),
        ),
      ],
    );
  }
}

class _WeatherIconPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // Sun
    final sunPaint = Paint()..color = const Color(0xFFFBBF24);
    canvas.drawCircle(Offset(size.width * 0.75, size.height * 0.4), 18, sunPaint);

    // Cloud
    final cloudPaint = Paint()..color = Colors.white.withValues(alpha: 0.9);
    final c = Offset(size.width * 0.45, size.height * 0.55);
    canvas.drawOval(Rect.fromCenter(center: c, width: size.width * 0.6, height: size.height * 0.35), cloudPaint);
    canvas.drawOval(Rect.fromCenter(center: Offset(c.dx - 20, c.dy - 10), width: 28, height: 22), cloudPaint);
    canvas.drawOval(Rect.fromCenter(center: Offset(c.dx + 15, c.dy - 8), width: 30, height: 24), cloudPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isActive;
  final VoidCallback onTap;
  const _NavItem({
    required this.icon,
    required this.label,
    required this.isActive,
    required this.onTap,
  });
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (isActive)
            Container(
              width: 6,
              height: 6,
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
              margin: const EdgeInsets.only(bottom: 4),
            ),
          Icon(
            isActive ? Icons.home : icon,
            size: 24,
            color: isActive ? AppColors.primary : AppColors.mutedForeground,
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
              color: isActive ? AppColors.primary : AppColors.mutedForeground,
            ),
          ),
        ],
      ),
    );
  }
}
