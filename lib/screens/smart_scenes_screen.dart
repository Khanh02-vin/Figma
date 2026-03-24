import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/data_constants.dart';

class SmartScenesScreen extends StatefulWidget {
  final Function(String) onNavigate;

  const SmartScenesScreen({super.key, required this.onNavigate});

  @override
  State<SmartScenesScreen> createState() => _SmartScenesScreenState();
}

class _SmartScenesScreenState extends State<SmartScenesScreen> {
  int _tab = 1; // Start on Tap-to-Run tab

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        bottom: false,
        child: Stack(
          children: [
            Column(
              children: [
                // Header
                Container(
                  padding: const EdgeInsets.all(16),
                  color: Colors.white,
                  child: Row(
                    children: [
                      const Row(
                        children: [
                          Text('My Home', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                          Icon(Icons.keyboard_arrow_down, color: AppColors.mutedForeground),
                        ],
                      ),
                      const Spacer(),
                      IconButton(onPressed: () {}, icon: const Icon(Icons.description_outlined)),
                      IconButton(onPressed: () {}, icon: const Icon(Icons.grid_view)),
                    ],
                  ),
                ),
                // Tabs
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: AppColors.muted.withValues(alpha: 0.3),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        Expanded(child: _TabBtn('Automation', _tab == 0, () => setState(() => _tab = 0))),
                        Expanded(child: _TabBtn('Tap-to-Run', _tab == 1, () => setState(() => _tab = 1))),
                      ],
                    ),
                  ),
                ),

                Expanded(
                  child: _tab == 0
                      ? _buildAutomationTab()
                      : _buildTapToRunTab(),
                ),

                const SizedBox(height: 80),
              ],
            ),
            // FAB
            Positioned(
              bottom: 80,
              right: 16,
              child: GestureDetector(
                onTap: () => widget.onNavigate('create-scene'),
                child: Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    shape: BoxShape.circle,
                    boxShadow: [BoxShadow(color: AppColors.primary.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4))],
                  ),
                  child: const Icon(Icons.add, color: Colors.white, size: 28),
                ),
              ),
            ),
            // Bottom nav
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: Container(
                color: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _BottomNavItem(icon: Icons.home_outlined, label: 'Home', isActive: false, onTap: () {}),
                    _BottomNavItem(icon: Icons.checklist, label: 'Smart', isActive: true, onTap: () {}),
                    _BottomNavItem(icon: Icons.bar_chart, label: 'Reports', isActive: false, onTap: () {}),
                    _BottomNavItem(icon: Icons.person_outline, label: 'Account', isActive: false, onTap: () {}),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAutomationTab() {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      itemCount: automations.length,
      itemBuilder: (ctx, i) {
        final auto = automations[i];
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      auto['name'] as String,
                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                    ),
                  ),
                  const Icon(Icons.chevron_right, color: AppColors.mutedForeground),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                '${auto['tasks']} task${(auto['tasks'] as int) > 1 ? 's' : ''}',
                style: const TextStyle(fontSize: 12, color: AppColors.mutedForeground),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  _ColorDot(color: auto['triggerColor'] as Color),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 6),
                    child: Text('→', style: TextStyle(color: AppColors.mutedForeground)),
                  ),
                  _ColorDot(color: auto['actionColor'] as Color),
                  const Spacer(),
                  _ToggleSw(isOn: auto['isOn'] as bool),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildTapToRunTab() {
    final scenes = tapToRunScenes;
    return GridView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: 0.88,
      ),
      itemCount: scenes.length,
      itemBuilder: (ctx, i) {
        final scene = scenes[i];
        return _TapToRunCard(scene: scene, onTap: () => widget.onNavigate('edit-scene'));
      },
    );
  }
}

class _TabBtn extends StatelessWidget {
  final String label;
  final bool isActive;
  final VoidCallback onTap;
  const _TabBtn(this.label, this.isActive, this.onTap);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: isActive ? AppColors.primary : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w500,
            color: isActive ? Colors.white : AppColors.mutedForeground,
          ),
        ),
      ),
    );
  }
}

class _ColorDot extends StatelessWidget {
  final Color color;
  const _ColorDot({required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 28,
      height: 28,
      decoration: BoxDecoration(color: color, shape: BoxShape.circle),
      child: Center(
        child: Container(
          width: 12,
          height: 12,
          decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
        ),
      ),
    );
  }
}

class _ToggleSw extends StatelessWidget {
  final bool isOn;
  const _ToggleSw({required this.isOn});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 48,
      height: 28,
      padding: const EdgeInsets.all(2),
      decoration: BoxDecoration(
        color: isOn ? AppColors.primary : AppColors.muted,
        borderRadius: BorderRadius.circular(14),
      ),
      child: AnimatedAlign(
        alignment: isOn ? Alignment.centerRight : Alignment.centerLeft,
        duration: const Duration(milliseconds: 200),
        child: Container(
          width: 24,
          height: 24,
          decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
        ),
      ),
    );
  }
}

class _TapToRunCard extends StatelessWidget {
  final Map<String, dynamic> scene;
  final VoidCallback onTap;

  const _TapToRunCard({required this.scene, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: scene['bgColor'] as Color,
          borderRadius: BorderRadius.circular(20),
        ),
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.25),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    scene['icon'] as IconData,
                    color: Colors.white,
                    size: 22,
                  ),
                ),
                if (scene['isRunning'] == true)
                  SizedBox(
                    width: 22,
                    height: 22,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white.withValues(alpha: 0.8)),
                    ),
                  )
                else
                  Icon(Icons.chevron_right, color: Colors.white.withValues(alpha: 0.7), size: 22),
              ],
            ),
            const Spacer(),
            Text(
              scene['title'] as String,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              '${scene['tasks']} task${(scene['tasks'] as int) > 1 ? 's' : ''}',
              style: TextStyle(
                color: Colors.white.withValues(alpha: 0.8),
                fontSize: 12,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _BottomNavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isActive;
  final VoidCallback onTap;
  const _BottomNavItem({
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
          Icon(
            isActive ? Icons.checklist : icon,
            size: 22,
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

// ---------------------------------------------------------------------------
// Tap-to-Run scene data
// ---------------------------------------------------------------------------
const List<Map<String, dynamic>> tapToRunScenes = [
  {
    'id': 1,
    'title': 'Quick Lights ON',
    'tasks': 1,
    'icon': Icons.wb_sunny,
    'bgColor': Color(0xFFF97316),
    'isRunning': true,
  },
  {
    'id': 2,
    'title': 'Bedtime Prep',
    'tasks': 2,
    'icon': Icons.nightlight_round,
    'bgColor': Color(0xFF60A5FA),
    'isRunning': false,
  },
  {
    'id': 3,
    'title': 'Evening Chill',
    'tasks': 4,
    'icon': Icons.wb_twilight,
    'bgColor': Color(0xFF4ADE80),
    'isRunning': false,
  },
  {
    'id': 4,
    'title': 'Boost Productivity',
    'tasks': 1,
    'icon': Icons.trending_up,
    'bgColor': Color(0xFFA855F7),
    'isRunning': false,
  },
  {
    'id': 5,
    'title': 'Get Energized',
    'tasks': 3,
    'icon': Icons.local_fire_department,
    'bgColor': Color(0xFFEF4444),
    'isRunning': false,
  },
  {
    'id': 6,
    'title': 'Home Office',
    'tasks': 2,
    'icon': Icons.home,
    'bgColor': Color(0xFF14B8A6),
    'isRunning': false,
  },
  {
    'id': 7,
    'title': 'Reading Corner',
    'tasks': 4,
    'icon': Icons.menu_book,
    'bgColor': Color(0xFF92400E),
    'isRunning': false,
  },
  {
    'id': 8,
    'title': 'Outdoor Party',
    'tasks': 3,
    'icon': Icons.celebration,
    'bgColor': Color(0xFF475569),
    'isRunning': false,
  },
];
